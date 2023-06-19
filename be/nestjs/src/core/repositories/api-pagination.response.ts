import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from '../dtos/paginated.dto';

interface IPaginatedDecoratorApiResponse {
  model: Type<any>;
  description?: string;
}

export const ApiPaginatedResponse = (
  options: IPaginatedDecoratorApiResponse,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto),
    ApiOkResponse({
      description: options.description || 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(options.model) },
              },
              meta: {
                type: 'any',
                default: {
                  totalItems: 1,
                  itemCount: 1,
                  itemsPerPage: 1,
                  totalPages: 1,
                  currentPage: 1,
                },
              },
            },
          },
        ],
      },
    }),
  );
};
