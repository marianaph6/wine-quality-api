import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class PredictionService {
  private readonly modelUrl = 'http://127.0.0.1:5001/invocations';

  /**
   * Predice la calidad del vino utilizando las características proporcionadas.
   * @param features Array de características.
   * @returns Etiqueta de calidad del vino.
   */
  async predictWineQuality(features: number[]): Promise<string> {
    try {
      // Crear payload en formato 'dataframe_split'
      const payload = {
        dataframe_split: {
          data: [features], // Características en formato array anidado
        },
      };

      // Enviar la solicitud al modelo
      const response = await axios.post(this.modelUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Extraer predicción
      const predictedQuality = response.data.predictions[0]; // Obtener el primer valor de 'predictions'

      // Clasificar la calidad basada en la predicción
      return this.classifyQuality(predictedQuality);
    } catch (error) {
      // Manejo de errores específicos de Axios
      if (error instanceof AxiosError) {
        throw new HttpException(
          `Error consumiendo el modelo: ${error.response?.data?.message || error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Error desconocido al consumir el modelo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Clasifica la calidad del vino según la predicción.
   * @param quality Valor predicho por el modelo.
   * @returns Etiqueta de calidad.
   */
  private classifyQuality(quality: number): string {
    if (quality >= 7) {
      return 'Calidad Alta';
    } else if (quality >= 5) {
      return 'Calidad Media';
    } else {
      return 'Calidad Baja';
    }
  }
}
