<?php

class StaffCest
{
    private $endpointLogin = '/v1/staff/login';
    private $endpointCreate = '/v1/staff';

    public function staffLoginInvalidFields(ApiTester $I)
    {
        $I->sendPOST($this->endpointLogin);

        $I->seeResponseCodeIs(422);
        $I->seeResponseIsJson();

        $I->seeResponseContainsJson([
            'success' => false,
            'status'  => 422,
        ]);

        $I->sendPOST($this->endpointLogin, [
            'LoginForm' => [
                'username' => 'admin',
            ]
        ]);

        $I->seeResponseCodeIs(422);
        $I->seeResponseIsJson();

        $I->seeResponseContainsJson([
            'success' => false,
            'status'  => 422,
        ]);

        $I->sendPOST($this->endpointLogin, [
            'LoginForm' => [
                'password' => '123456',
            ]
        ]);

        $I->seeResponseCodeIs(422);
        $I->seeResponseIsJson();

        $I->seeResponseContainsJson([
            'success' => false,
            'status'  => 422,
        ]);
    }

    public function staffLoginInvalidCredentials(ApiTester $I)
    {
        $I->sendPOST($this->endpointLogin, [
            'LoginForm' => [
                'username' => 'admin',
                'password' => '1234567',
            ]
        ]);

        $I->seeResponseCodeIs(422);
        $I->seeResponseIsJson();

        $I->seeResponseContainsJson([
            'success' => false,
            'status'  => 422,
        ]);
    }

    public function staffLogin(ApiTester $I)
    {
        $I->amStaff();

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
            'status'  => 200,
        ]);
        $I->seeResponseMatchesJsonType([
            'id' => 'integer',
            'access_token' => 'string',
        ], '$.data');
    }

    public function staffCreateStaffInvalidFields(ApiTester $I)
    {
        $I->amStaff();

        $I->sendPOST($this->endpointCreate);

        $I->seeResponseCodeIs(422);
        $I->seeResponseIsJson();

        $I->seeResponseContainsJson([
            'success'=> false,
            'status'=> 422,
            'data'=> [
                'username' => [],
                'email' => [],
                'role_id' => [],
                'kabkota_id' => [],
                'kec_id' => [],
                'kel_id' => [],
                'rw' => []
            ]
        ]);

        $I->sendPOST($this->endpointCreate, [
            'username' => 'staff.kabkota.2',
            'email' => 'staff.kabkota.2@jabarprov.go.id',
            'password' => '123456',
            'role_id' => 'staffKabkota'
        ]);

        $I->seeResponseCodeIs(422);
        $I->seeResponseIsJson();

        $I->seeResponseContainsJson([
            'success'=> false,
            'status'=> 422,
            'data'=> [
                'kabkota_id' => []
            ]
        ]);
    }

    public function staffCreateStaff(ApiTester $I)
    {
        $I->amStaff();

        $I->sendPOST($this->endpointCreate, [
            'username' => 'staff.prov.1',
            'email' => 'staff.prov.1@jabarprov.go.id',
            'password' => '123456',
            'role_id' => 'staffProv'
        ]);

        $I->canSeeResponseCodeIs(201);
        $I->seeResponseIsJson();
    }
}