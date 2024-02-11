export type ResponseProtocol = SuccessResponseProtocol | ErrorResponseProtocol;

export type SuccessResponseProtocol = {
  status : number;
  message : string;
  data? : any;
};

export type ErrorResponseProtocol = {
  status : number;
  message : string;
  data? : any;
};
