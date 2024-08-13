export interface HttpServiceProps {
  baseUrl?: string;
  uri: string;
  body?: any;
  headers?: any;
}

export interface HttpServiceResponse<T = any> {
  status: number;
  body: T;
}

export class HttpService {
  private apiBaseUrl(baseUrl?: string): string {
    return baseUrl ?? process.env.apiBaseUrl ?? "";
  }

  private async fetchApi<T = any>(
    method: string,
    { baseUrl, uri, body, headers }: HttpServiceProps
  ): Promise<HttpServiceResponse<T>> {
    const response = await fetch(`${this.apiBaseUrl(baseUrl)}/${uri}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to complete request: ${JSON.stringify(
          responseJson?.message ?? responseJson.error
        )}`
      );
    }

    return {
      status: response.status,
      body: responseJson as T,
    };
  }

  async get<T = any>(props: HttpServiceProps): Promise<HttpServiceResponse<T>> {
    return this.fetchApi("GET", props);
  }

  async post<T = any>(
    props: HttpServiceProps
  ): Promise<HttpServiceResponse<T>> {
    return this.fetchApi("POST", {
      ...props,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
}
