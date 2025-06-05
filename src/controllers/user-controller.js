import { UserRepository } from "../repositories/user-repository.js";
import { userSchema } from "../schemas/user-schema.js";
import { uuidSchema } from "../schemas/uuid-schema.js";

export class UserController {
  async getUsers(request, response) {
    const result = await new UserRepository().getUsers();

    return response.status(200).send(result);
  }

  async getUserById(request, response) {
    const { id } = request.params;

    const validation = uuidSchema.safeParse(id);

    if (!validation.success)
      return response.status(400).send(validation.error.errors);

    const result = await new UserRepository().getUserById(id);

    if (!result.length)
      return response.status(404).send({ message: "Usuário não encontrado." });

    return response.status(200).send(result);
  }

  async getPurchaseInfoByUser(request, response) {
    let result = await new UserRepository().getPurchaseInfoByUser();

    result = result.map((item) => {
      const formattedValues = {
        id: item.id,
        name: item.name,
        surname: item.surname,
        email: item.email,
        purchase_info: {
          delivery_address: item.delivery_address,
          purchase_date: item.purchase_date,
        },
      };

      return formattedValues;
    });

    return response.status(200).send(result);
  }

  async createUser(request, response) {
    const { body } = request;

    const validation = userSchema.safeParse(body);

    if (!validation.success)
      return response.status(400).send(validation.error.errors);

    const userColumns = ["name", "surname", "email"];

    const values = userColumns.reduce((acc, columnName) => {
      acc.push(body[columnName]);
      return acc;
    }, []);

    await new UserRepository().createUser(values);

    return response
      .status(201)
      .send({ message: "Usuário criado com sucesso!" });
  }

  async updateUserById(request, response) {
    const { id } = request.params;
    const { body } = request;

    const idValidation = uuidSchema.safeParse(id);

    if (!idValidation.success)
      return response.status(400).send(idValidation.error.errors);

    const searchedUser = await new UserRepository().getUserById(id);

    if (!searchedUser.length)
      return response.status(404).send({ message: "Usuário não encontrado." });

    const bodyValidation = userSchema.safeParse(body);

    if (!bodyValidation.success)
      return response.status(400).send(bodyValidation.error.errors);

    const columns = ["name", "surname", "email"];

    const values = columns.map((column) => body[column]);

    await new UserRepository().updateUserById(id, values);

    return response
      .status(200)
      .send({ message: "Usuário editado com sucesso!" });
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
