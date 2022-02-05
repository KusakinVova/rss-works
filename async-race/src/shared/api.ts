import { ICarModel } from './models/modelCar';
import { ICarProps } from './models/modelCarProps';
import { ICars } from './models/modelPageCars';
import { EngineStatus } from './models/modelEngineStatus';
import { IDriveStatus, IEngineParams } from './models/modelEngineParam';
import { SortOrder } from './models/SortOrder';
import { SortParams } from './models/SortParams';
import { IWinnerTime, IWinner } from './models/modelWinner';
import { IWinners } from './models/modelPageWinners';

class Api {
  private base = 'http://localhost:3000';

  private garage = `${this.base}/garage`;

  private engine = `${this.base}/engine`;

  private winners = `${this.base}/winners`;

  async getCars(page = 1, limit = 7): Promise<ICars> {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await response.json(),
      count: Number(response.headers.get('X-Total-Count')),
    };
  }

  async getCar(id: number): Promise<ICarModel> {
    const response = await fetch(`${this.garage}/${id}`);
    return response.json();
  }

  async createCar(body: ICarProps): Promise<ICarModel> {
    const response = await fetch(this.garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async deleteCar(id: number): Promise<void> {
    const respone = await fetch(`${this.garage}/${id}`, {
      method: 'DELETE',
    });
    return respone.json();
  }

  async updateCar(id: number, body: ICarProps): Promise<ICarModel> {
    const response = await fetch(`${this.garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async startEngine(id: number): Promise<IEngineParams> {
    const respone = await (fetch(`${this.engine}?id=${id}&status=${EngineStatus.started}`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }));
    return respone.json();
  }

  async stopEngine(id: number): Promise<IEngineParams> {
    const response = await (fetch(`${this.engine}?id=${id}&status=${EngineStatus.stopped}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    return response.json();
  }

  async driveCar(id: number): Promise<IDriveStatus> {
    const response = await fetch(`${this.engine}?id=${id}&status=drive`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch();
    return response.status !== 200 ? { success: false } : { success: true };
  }

  async getWinners(page = 1, limit = 10, sort = SortParams.id, order = SortOrder.fromLowest): Promise<IWinners> {
    const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    return {
      items: await response.json(),
      count: Number(response.headers.get('X-Total-Count')),
    };
  }

  async getWinner(id: number): Promise<IWinner> {
    const response = await fetch(`${this.winners}/${id}`);
    return response.json();
  }

  async createWinner(body: IWinner): Promise<IWinner> {
    const response = await fetch(this.winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async updateWinner(id: number, body: IWinnerTime): Promise<IWinner> {
    const response = await fetch(`${this.winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async delWinner(id: number): Promise<void> {
    const response = await fetch(`${this.winners}/${id}`, { method: 'DELETE' });
    return response.json();
  }
}

export const api = new Api();
