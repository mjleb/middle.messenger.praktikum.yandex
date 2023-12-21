export default abstract class BaseAPI {
  static apiUrl = 'https://ya-praktikum.tech/api/v2';

  create(title?: string): Promise<unknown> {
    console.log(title);
    throw new Error('Not implemented');
  }

  request(): Promise<unknown> {
    throw new Error('Not implemented');
  }

  update(data: Record<string, any>): Promise<unknown> {
    console.log(data);
    throw new Error('Not implemented');
  }

  delete(id: number): Promise<unknown> {
    console.log(id);
    throw new Error('Not implemented');
  }
}
