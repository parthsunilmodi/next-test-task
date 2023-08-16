declare type IResponse<T> = {
  status: number;
  data: T;
}

declare type IRawResponse = {
  'ConsumedQuantity': string;
  'Cost': string;
  'Date': string;
  'InstanceId': string;
  'MeterCategory': string;
  'ResourceGroup': string;
  'ResourceLocation': string;
  'Tags': {
    'app-name': string;
    'environment': string;
    'business-unit': string;
  },
  'UnitOfMeasure': string;
  'Location': string;
  'ServiceName': string;
}

export type { IRawResponse, IResponse };