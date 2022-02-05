import { ICarProps } from '../models/modelCarProps';
import { getRandColor } from './getRandColor';
import { getRandCarName } from './getRandCarName';

export function generateCar(): ICarProps {
  return {
    name: getRandCarName(),
    color: getRandColor(),
  };
}
