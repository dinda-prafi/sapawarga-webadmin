<?php

namespace app\models;

use Illuminate\Support\Arr;
use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use yii\data\SqlDataProvider;
use yii\db\JsonExpression;

/**
 * NotificationSearch represents the model behind the search form of `app\models\Notification`.
 */
class NotificationSearch extends Notification
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['title'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search(User $user, $params)
    {
        $query = Notification::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // Filter berdasarkan query pencarian
        $search = $params['search'] ?? null;
        $query->andFilterWhere([
            'or',
            ['like', 'title', $search],
            ['like', 'description', $search],
        ]);

        // Jika User
        if ($user->role <= User::ROLE_STAFF_RW) {
            return $this->getQueryRoleUser($user, $query, $params);
        }

        // Else Has Admin Role, tampilkan semua
        return $this->getQueryAll($query, $params);
    }

    protected function getQueryRoleUser($user, $query, $params)
    {
        // Hanya menampilkan pesan notification yang masih aktif
        $query->andFilterWhere(['status' => Notification::STATUS_PUBLISHED]);

        // Hanya menampilkan pesan notification yang di-publish setelah user melakukan login
        $query->andFilterWhere(['>=', 'updated_at', $user->last_login_at]);

        // Filter berdasarkan area pengguna
        $params['kabkota_id'] = Arr::get($user, 'kabkota_id');
        $params['kec_id'] = Arr::get($user, 'kec_id');
        $params['kel_id'] = Arr::get($user, 'kel_id');
        $params['rw'] = Arr::get($user, 'rw');

        $this->filterByArea($query, $params);

        $pageLimit = Arr::get($params, 'limit');
        $sortBy    = Arr::get($params, 'sort_by', 'updated_at');
        $sortOrder = Arr::get($params, 'sort_order', 'descending');
        $sortOrder = $this->getSortOrder($sortOrder);

        return new ActiveDataProvider([
            'query' => $query,
            'sort'=> ['defaultOrder' => [$sortBy => $sortOrder]],
            'pagination' => [
                'pageSize' => $pageLimit,
            ],
        ]);
    }

    protected function getQueryAll($query, $params)
    {
        // Hanya menampilkan pesan notification dengan status aktif dan draft
        $query->andFilterWhere(['<>', 'status', Notification::STATUS_DELETED]);

        // Filter berdasarkan area (jika ada)
        $this->filterByArea($query, $params);

        // Filter berdasarkan status dam kategori
        $query->andFilterWhere(['status' => Arr::get($params, 'status')])
              ->andFilterWhere(['category_id' => Arr::get($params, 'category_id')]);

        $pageLimit = Arr::get($params, 'limit');
        $sortBy    = Arr::get($params, 'sort_by', 'updated_at');
        $sortOrder = Arr::get($params, 'sort_order', 'descending');
        $sortOrder = $this->getSortOrder($sortOrder);

        return new ActiveDataProvider([
            'query' => $query,
            'sort'=> ['defaultOrder' => [$sortBy => $sortOrder]],
            'pagination' => [
                'pageSize' => $pageLimit,
            ],
        ]);
    }

    protected function isCustomFilter($params)
    {
        return Arr::has($params, 'kabkota_id') || Arr::has($params, 'kec_id') || Arr::has($params, 'kel_id');
    }

    protected function filterByArea(&$query, $params)
    {
        if (Arr::has($params, 'kabkota_id')) {
            $query->andWhere(['or',
                ['kabkota_id' => $params['kabkota_id']],
                ['kabkota_id' => null]]);
        }

        if (Arr::has($params, 'kec_id')) {
            $query->andWhere(['or',
                ['kec_id' => $params['kec_id']],
                ['kec_id' => null]]);
        }

        if (Arr::has($params, 'kel_id')) {
            $query->andWhere(['or',
                ['kel_id' => $params['kel_id']],
                ['kel_id' => null]]);
        }

        if (Arr::has($params, 'rw')) {
            $query->andWhere(['or',
                ['rw' => $params['rw']],
                ['rw' => null]]);
        }

        return $query;
    }

    protected function getSortOrder($sortOrder)
    {
        switch ($sortOrder) {
            case 'descending':
                return SORT_DESC;
                break;
            case 'ascending':
            default:
                return SORT_ASC;
                break;
        }
    }
}