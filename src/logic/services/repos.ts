interface IDBRepository {
  getAll(): Promise<Array<string>>;
  save(email: string): Promise<boolean>;
}

export { IDBRepository };
