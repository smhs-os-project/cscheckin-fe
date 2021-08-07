/**
 * The response of all the methods under Http.
 */
export interface HttpResponse<Data> {
  data: Data | null;
  error: Error | null;
  pending: boolean;
}
