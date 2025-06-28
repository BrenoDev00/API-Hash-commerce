import { UserRepository } from "../repositories/user-repository.js";
import { userSchema } from "../schemas/user-schema.js";
import { uuidSchema } from "../schemas/uuid-schema.js";
import { Request, Response } from "express";
import {
  UserInterface,
  UserControllerInterface,
  StatusCodeEnum,
  ResponseMessageInterface,
  PurchaseInfoByUserInterface,
  PurchaseInfoByUserResponseInterface,
} from "../types/index.js";
import { INTERNAL_ERROR_MESSAGE } from "../utils/index.js";

export class UserController implements UserControllerInterface {
  async getUsers(
    _request: Request,
    response: Response<UserInterface[] | ResponseMessageInterface>
  ): Promise<Response<UserInterface[] | ResponseMessageInterface>> {
    try {
      const result: UserInterface[] = await new UserRepository().getUsers();

      return response.status(StatusCodeEnum.Ok).send(result);
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async getUserById(
    request: Request<{ id: string }>,
    response: Response<UserInterface[] | ResponseMessageInterface>
  ): Promise<Response<UserInterface[] | ResponseMessageInterface>> {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success)
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: validation.error.errors });

    try {
      const result: UserInterface[] = await new UserRepository().getUserById(
        id
      );
      if (!result.length)
        return response
          .status(StatusCodeEnum.NotFound)
          .send({ message: "Usuário não encontrado." });

      return response.status(StatusCodeEnum.Ok).send(result);
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async getPurchaseInfoByUser(
    _request: Request,
    response: Response<
      PurchaseInfoByUserResponseInterface[] | ResponseMessageInterface
    >
  ): Promise<
    Response<PurchaseInfoByUserResponseInterface[] | ResponseMessageInterface>
  > {
    try {
      const queryResult: PurchaseInfoByUserInterface[] =
        await new UserRepository().getPurchaseInfoByUser();

      const result: PurchaseInfoByUserResponseInterface[] = queryResult.map(
        (item) => {
          const formattedValues: PurchaseInfoByUserResponseInterface = {
            id: item.id,
            name: item.name,
            surname: item.surname,
            email: item.email,
            purchaseInfo: {
              deliveryAddress: item.deliveryAddress,
              purchaseDate: item.purchaseDate,
            },
          };

          return formattedValues;
        }
      );

      return response.status(StatusCodeEnum.Ok).send(result);
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async createUser(
    request: Request<{}, {}, Omit<UserInterface, "id">>,
    response: Response<ResponseMessageInterface>
  ): Promise<Response<ResponseMessageInterface>> {
    const { body } = request;

    const validation = userSchema.safeParse(body);

    if (!validation.success)
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: validation.error.errors });

    const userColumns: (keyof Omit<UserInterface, "id">)[] = [
      "name",
      "surname",
      "email",
    ];

    const values: string[] = userColumns.reduce(
      (acc: string[], columnName): string[] => {
        acc.push(body[columnName]);
        return acc;
      },
      []
    );

    try {
      await new UserRepository().createUser(values);

      return response
        .status(StatusCodeEnum.Created)
        .send({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async updateUserById(
    request: Request<{ id: string }, {}, Omit<UserInterface, "id">>,
    response: Response<ResponseMessageInterface>
  ): Promise<Response<ResponseMessageInterface>> {
    const { id } = request.params;
    const { body } = request;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: idValidation.error.errors });

    const searchedUser: UserInterface[] =
      await new UserRepository().getUserById(id);

    if (!searchedUser.length)
      return response
        .status(StatusCodeEnum.NotFound)
        .send({ message: "Usuário não encontrado." });

    const bodyValidation = userSchema.safeParse(body);

    if (!bodyValidation.success)
      return response
        .status(StatusCodeEnum.BadRequest)
        .send({ message: bodyValidation.error.errors });

    const columns: (keyof Omit<UserInterface, "id">)[] = [
      "name",
      "surname",
      "email",
    ];

    const values: string[] = columns.map((column) => body[column]);

    try {
      await new UserRepository().updateUserById(id, values);

      return response
        .status(StatusCodeEnum.Ok)
        .send({ message: "Usuário editado com sucesso!" });
    } catch (error) {
      return response
        .status(StatusCodeEnum.InternalError)
        .send({ message: INTERNAL_ERROR_MESSAGE });
    }
  }

  async deleteUserById(request, response) {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success)
      return response.status(400).send(validation.error.errors);

    const searchedUser = await new UserRepository().getUserById(id);

    if (!searchedUser.length)
      return response.status(404).send({ message: "Usuário não encontrado." });

    await new UserRepository().deleteUserById(id);

    return response
      .status(200)
      .send({ message: "Usuário excluído com sucesso!" });
  }
}
