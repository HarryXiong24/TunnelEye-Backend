import { ExampleService } from '../services';

class ExampleController {
  private service: ExampleService = new ExampleService();

  example = async (ctx, next) => {
    ctx.body = await this.service.example();
  };
}

export default new ExampleController();
