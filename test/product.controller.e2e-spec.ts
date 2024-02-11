import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { DatabaseService } from '../src/database/database.service';
import { productDtoStub } from '../src/modules/product/stub/product-dto.stub';
import * as request from 'supertest';
import { paginatedStub } from '../src/modules/product/stub/paginated.stub';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { createdProductDtoStub } from '../src/modules/product/stub/created-product-dto.stub';
import { updateProductDtoStub } from '../src/modules/product/stub/update-product-dto.stub';

describe('Product controller integration', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    dbConnection = module.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConnection.collection('product').deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('product').deleteMany({});
  });

  describe('Post /products', () => {
    it('should return an product', async () => {
      const response = await request(httpServer)
        .post('/products')
        .send(createdProductDtoStub());

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('quantity');
      expect(response.body).toHaveProperty('category');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return an BadRequestException', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer).get(
        '/products?category=CATEGORY_100',
      );

      expect(response.status).toBe(400);
    });
  });

  describe('GET /products', () => {
    it('should return an paginationResponse', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer).get('/products');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toMatchObject(paginatedStub(productDtoStub()));
    });

    it('should return an BadRequestException', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer).get(
        '/products?category=CATEGORY_100',
      );

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('GET /products/:id', () => {
    it('should return a product', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer).get(
        `/products/${productDtoStub().id}`,
      );

      expect(response.status).toBe(HttpStatus.FOUND);
      expect(response.body).toMatchObject(productDtoStub());
    });

    it('should return an NotFoundException', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer).get('/products/aaaaaaa}');

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('PUT /products/:id', () => {
    it('should return a product', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer)
        .put(`/products/${productDtoStub().id}`)
        .send(updateProductDtoStub());

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('quantity');
      expect(response.body).toHaveProperty('category');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return an NotFoundException', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer)
        .put('/products/aaaaaaa}')
        .send(updateProductDtoStub());

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /products/:id', () => {
    it('should return a product', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer).delete(
        `/products/${productDtoStub().id}`,
      );

      expect(response.status).toBe(HttpStatus.OK);
    });

    it('should return an NotFoundException', async () => {
      await dbConnection.collection('product').insertOne(productDtoStub());
      const response = await request(httpServer).delete('/products/aaaaaaa}');

      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
