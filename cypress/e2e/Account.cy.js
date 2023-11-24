import { DEFAULT_USER, NEW_USER, DELETE_USER } from "../constants";
import "../support/commands";

before(() => {
  cy.login(DEFAULT_USER.username, DEFAULT_USER.password);
});

describe("Manage Account test", () => {
  beforeEach(() => {
    cy.visit(
      process.env.NEXT_PUBLIC_API_URL + `/admin/account`
    );
  });

  it("Memastikan terdapat field search bar, list user, dan button tambah user", () => {
    cy.get("[name=search]").should("be.visible");
    cy.get("table").contains("td", "admin").should("be.visible");
    cy.get("button").contains("Tambah User").should("be.visible");
  });

  it("User list hanya menampilkan user yang dicari pada search bar", () => {
    cy.get("[name=search]").type("warehouse");
    cy.get("table").contains("td", "warehouse").should("be.visible");

    cy.get("table").contains("td", "admin").should("not.exist");
  });

  it("Menambahkan Akun", () => {
    cy.get("button").contains("Tambah User").click();

    cy.get("[name=username]").should("be.visible").type(NEW_USER.username);
    cy.get("[name=name]").should("be.visible").type(NEW_USER.name);
    cy.get("[name=password]").should("be.visible").type(NEW_USER.password);
    cy.get("label").contains("Role").should("be.visible");

    cy.get("select").trigger("click");
    cy.get("option").contains("Admin");
    cy.get("option").contains("Warehouse");
    cy.get("option").contains("Cashier");

    cy.get("button").contains("Konfirmasi").click();
  });

  it("Menghapus akun", () => {
    cy.get(`[about=${DELETE_USER.id}]`).should("be.visible").click();
    cy.get("button").contains("Hapus Akun");
  });
});
