export default {
  /**
   * This value is arbitrary and used when making GQL queries to AppSync.
   * It is used to fetch "all" records in cases where pagination is unnecessary.
   */
  arbitraryQueryLimit: 1000,
  app: {
    name: 'Mr Bucket',
    companyName: 'Mr Bucket Singapore Pte Ltd',
    absoluteUrl: 'https://www.mrbucket.com.sg',
    contact: {
      email: 'info@mrbucket.com.sg',
    },
  },
  adminAbsoluteUrl: 'https://admin.mrbucket.com.sg',
  meta: {
    title: 'MBK',
  },
  aws: {
    aws_project_region: process.env.aws_project_region,
    aws_appsync_graphqlEndpoint: process.env.aws_appsync_graphqlEndpoint,
    aws_appsync_region: process.env.aws_appsync_region,
    aws_appsync_authenticationType: process.env.aws_appsync_authenticationType,
    aws_appsync_apiKey: process.env.aws_appsync_apiKey,
    aws_cloud_logic_custom: [
      {
        name: 'stripe',
        endpoint: process.env.aws_cloud_logic_custom_stripe_endpoint,
        region: 'ap-southeast-1',
      },
      {
        name: 'mailgen',
        endpoint: process.env.aws_cloud_logic_custom_mailgen_endpoint,
        region: 'ap-southeast-1',
      },
    ],
    aws_cognito_identity_pool_id: process.env.aws_cognito_identity_pool_id,
    aws_cognito_region: process.env.aws_cognito_region,
    aws_user_pools_id: process.env.aws_user_pools_id,
    aws_user_pools_web_client_id: process.env.aws_user_pools_web_client_id,
    oauth: {},
    aws_user_files_s3_bucket: process.env.aws_user_files_s3_bucket,
    aws_user_files_s3_bucket_region: process.env.aws_user_files_s3_bucket_region,
    aws_mobile_analytics_app_id: process.env.aws_mobile_analytics_app_id,
    aws_mobile_analytics_app_region: process.env.aws_mobile_analytics_app_region,
  },
  eventKey: 'FACTORY_TOUR',
  mail: {
    aws_pinpoint_access_key_id: process.env.aws_pinpoint_access_key_id,
    aws_pinpoint_secret_access_key: process.env.aws_pinpoint_secret_access_key,
    defaultFrom: 'Mr Bucket <admin@mrbucket.com.sg>',
  },
  stripe: {
    publicKey: process.env.stripe_public_key,
  },
  analytics: {
    ga: {
      trackingId: '',
    },
  },
  seo: {
    title: 'MBK',
    description: '',
    image: '',
    url: 'https://www.mrbucket.com.sg',
  },
  socialProfileLinks: {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    twitter: 'https://www.twitter.com',
  },
  waitlist: 'https://forms.gle/4t4sSEiyWEHvW8Kx9',
}
