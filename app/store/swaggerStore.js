import {observable} from 'mobx';

export class SwaggerStore {
	file;
	@observable requests = observable.array([]);
}

export const swaggerStore = new SwaggerStore();