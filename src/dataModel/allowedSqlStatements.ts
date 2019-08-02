

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
