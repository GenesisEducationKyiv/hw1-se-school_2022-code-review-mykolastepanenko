interface IDBRepository {
  getAll(): any;
  save(email: string): Promise<boolean>;
}

export { IDBRepository };
