// Fitness functions das regras de importação do ADR-004
// (docs/ADRs/ADR-004-organizacao-diretorios-modulos.md#regras-de-importação).
// Os testes (*.test.ts) ficam fora da origem das regras, porque montam os casos
// de uso com os adaptadores em memória.

const MODULO = "^src/modulos/([^/]+)/";
const TESTE = "\\.test\\.tsx?$";
const BIBLIOTECAS_PROIBIDAS_NO_NUCLEO =
  "^node_modules/(react|react-dom|next|pg|postgres|@prisma|prisma|drizzle-orm|typeorm|kysely|knex|sequelize|mikro-orm|@mikro-orm)/";

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "sem-ciclos",
      comment: "Ciclos de dependência são proibidos.",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "ninguem-importa-app",
      comment: "Nenhuma pasta importa src/app/.",
      severity: "error",
      from: { pathNot: "^src/app/" },
      to: { path: "^src/app/" },
    },
    {
      name: "app-so-index-composicao-apresentacao",
      comment: "src/app/ importa só o index.ts dos módulos, composicao/ e compartilhado/apresentacao/.",
      severity: "error",
      from: { path: "^src/app/" },
      to: {
        path: "^src/",
        pathNot: [
          "^src/app/",
          "^src/modulos/[^/]+/index\\.ts$",
          "^src/composicao/",
          "^src/compartilhado/apresentacao/",
        ],
      },
    },
    {
      name: "modulo-so-pelo-index",
      comment: "Um módulo acessa outro só pelo index.ts dele.",
      severity: "error",
      from: { path: MODULO, pathNot: TESTE },
      to: {
        path: "^src/modulos/[^/]+/",
        pathNot: ["^src/modulos/$1/", "^src/modulos/[^/]+/index\\.ts$"],
      },
    },
    {
      name: "dominio-isolado",
      comment: "dominio/ importa só o próprio dominio/ e compartilhado/dominio/.",
      severity: "error",
      from: { path: `${MODULO}dominio/`, pathNot: TESTE },
      to: {
        path: "^src/",
        pathNot: ["^src/modulos/$1/dominio/", "^src/compartilhado/dominio/"],
      },
    },
    {
      name: "aplicacao-so-dominio",
      comment: "aplicacao/ importa só dominio/, a própria aplicacao/ e compartilhado/aplicacao/ e compartilhado/dominio/.",
      severity: "error",
      from: { path: `${MODULO}aplicacao/`, pathNot: TESTE },
      to: {
        path: "^src/",
        pathNot: [
          "^src/modulos/$1/(dominio|aplicacao)/",
          "^src/compartilhado/(dominio|aplicacao)/",
        ],
      },
    },
    {
      name: "infraestrutura-so-nucleo",
      comment: "infraestrutura/ importa só aplicacao/, dominio/, a própria infraestrutura/ e compartilhado/.",
      severity: "error",
      from: { path: `${MODULO}infraestrutura/`, pathNot: TESTE },
      to: {
        path: "^src/",
        pathNot: [
          "^src/modulos/$1/(dominio|aplicacao|infraestrutura)/",
          "^src/compartilhado/(dominio|aplicacao|infraestrutura)/",
        ],
      },
    },
    {
      name: "persistencia-nao-importa-integracao",
      comment: "persistencia/ e integracao/ não importam uma à outra.",
      severity: "error",
      from: { path: `${MODULO}infraestrutura/persistencia/` },
      to: { path: "^src/modulos/[^/]+/infraestrutura/integracao/" },
    },
    {
      name: "integracao-nao-importa-persistencia",
      comment: "persistencia/ e integracao/ não importam uma à outra.",
      severity: "error",
      from: { path: `${MODULO}infraestrutura/integracao/` },
      to: { path: "^src/modulos/[^/]+/infraestrutura/persistencia/" },
    },
    {
      name: "apresentacao-sem-infraestrutura",
      comment: "apresentacao/ nunca importa infraestrutura/.",
      severity: "error",
      from: { path: `${MODULO}apresentacao/` },
      to: { path: "^src/(modulos/[^/]+|compartilhado)/infraestrutura/" },
    },
    {
      name: "apresentacao-so-tipos-do-nucleo",
      comment: "apresentacao/ importa só tipos de aplicacao/ e dominio/.",
      severity: "error",
      from: { path: `${MODULO}apresentacao/`, pathNot: TESTE },
      to: {
        path: "^src/(modulos/[^/]+|compartilhado)/(aplicacao|dominio)/",
        dependencyTypesNot: ["type-only"],
      },
    },
    {
      name: "nucleo-sem-framework-nem-banco",
      comment: "dominio/ e aplicacao/ não importam React, Next.js, ORM nem driver de banco.",
      severity: "error",
      from: { path: "^src/(modulos/[^/]+|compartilhado)/(dominio|aplicacao)/" },
      to: { path: BIBLIOTECAS_PROIBIDAS_NO_NUCLEO },
    },
    {
      name: "sem-modulo-inexistente",
      comment: "Toda importação precisa ser resolvida.",
      severity: "error",
      from: {},
      to: { couldNotResolve: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "^src/app/globals\\.css$" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"],
    },
  },
};
