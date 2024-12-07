import { Body, Controller, Post } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './models/create-prediction.dto';

@Controller('prediction')
export class PredictionController {
    constructor(private readonly predictionService: PredictionService) { }

    @Post()
    async getPrediction(@Body() body: { features: number[] }): Promise<string> {
      return this.predictionService.predictWineQuality(body.features);
    }
}
