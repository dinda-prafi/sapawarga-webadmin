export const ResponseRequest = Object.freeze({
  TIMEOUT: 'ECONNABORTED',
  NETWORKERROR: 'Network Error'
})

export const SurveyStatus = Object.freeze({
  DRAFT: 0,
  ACTIVE: 10
})

export const PopupCategory = Object.freeze({
  EXTERNAL: 'external',
  INTERNAL: 'internal'
})

export const PopupFeature = Object.freeze({
  SURVEY: 'survey',
  POLLING: 'polling',
  NEWS: 'news'
})

export const RolesUser = Object.freeze({
  ADMIN: 'admin',
  STAFFPROV: 'staffProv',
  STAFFKABKOTA: 'staffKabkota',
  STAFFKEC: 'staffKec',
  STAFFKEL: 'staffKel',
  STAFFRW: 'staffRW',
  STAFFSABERHOAX: 'staffSaberhoax',
  TRAINER: 'trainer',
  USER: 'user'
})

export const rolesWidget = {
  ALL: 'all',
  'staffProv': ['admin', 'staffProv'],
  'staffKabkota': ['admin', 'staffProv', 'staffKabkota'],
  'staffKec': ['admin', 'staffProv', 'staffKabkota', 'staffKec'],
  'staffKel': ['admin', 'staffProv', 'staffKabkota', 'staffKec', 'staffKel'],
  'staffRW': ['admin', 'staffProv', 'staffKabkota', 'staffKec', 'staffKel', 'staffRW'],
  'staffSaberhoax': ['admin', 'staffSaberhoax'],
  'trainer': ['admin', 'staffProv', 'trainer'],
  'user': ['admin', 'staffProv', 'user']
}
