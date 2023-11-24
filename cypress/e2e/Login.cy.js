import { DEFAULT_USER } from '../constants'
// import EditProfilModal from "../../src/components/modal/EditProfilModal";

describe("Login test",() => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("Memastikan terdapat field untuk username dan password", () => {
        cy.get("[type=username]").should("be.visible");
        cy.get("[type=password]").should("be.visible");
    })

    it("Tidak dapat melakukan login jika input kosong", () => {
        cy.get("[type=submit]").click();
        cy.location('pathname')
    })

    it("Mengarah ke admin page jika berhasil login", () => {
        cy.get("[type=username]").type("admin");
        cy.get("[type=password]").type("123");
        cy.get("[type=submit]").click();

        cy.location('pathname').should('eq', '/admin')
    })
})