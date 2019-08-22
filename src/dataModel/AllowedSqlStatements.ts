/**
 * This class contains the AllowedSqlStatements enum. It is used to determine what kind of sql statements can be used.
 * NoRestrictions allow all types of sql statements.
 * SelectStatements only allow Statements that use select, but can't alter the table.
 * NoStatements restricts all sql statements and is currently not used.
 */
enum AllowedSqlStatements {
  NoRestriction,
  SelectStatements,
  NoStatements,
}

export function AllowedSqlFromJSON(json: any): AllowedSqlStatements {
  switch (json) {
    case "ALL": return AllowedSqlStatements.NoRestriction;
    case "QUERY": return AllowedSqlStatements.SelectStatements;
    case "NONE": return AllowedSqlStatements.NoStatements;
    default: return AllowedSqlStatements.NoRestriction;
  }
}

export function AllowedSqlToJSON(allowedSql: AllowedSqlStatements): any {
  switch (allowedSql) {
    case AllowedSqlStatements.NoRestriction: return "ALL";
    case AllowedSqlStatements.SelectStatements: return "QUERY";
    case AllowedSqlStatements.NoStatements: return "NONE";
  }
}

export default AllowedSqlStatements;
