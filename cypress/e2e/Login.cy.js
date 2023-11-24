import { DEFAULT_USER } from '../constants'

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
        cy.get("[type=username]").type(DEFAULT_USER.username);
        cy.get("[type=password]").type(DEFAULT_USER.password);
        cy.get("[type=submit]").click();

        cy.location('pathname').should('eq', '/admin')
    })
})

describe("Manage Account test",() => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/admin/account");
    });

    it("Memastikan terdapat field search bar, list user, dan button tambah user", () => {
        cy.get("[name=search]").should("be.visible");
        cy.get("table").contains("td", "admin").should("be.visible");
        cy.get("button").contains("Tambah User").should("be.visible");
    })

    it("User list hanya menampilkan user yang dicari pada search bar", () => {
        cy.get("[name=search]").type("warehouse");
        cy.get("table").contains("td", "warehouse").should("be.visible");
        
        cy.get("table").contains("td", "admin").should("not.exist")
    })


    it("Menambahkan Akun", () => {
        cy.get("button").contains("Tambah User").click();

        cy.get("[name=username]").should("be.visible").type("akun");
        cy.get("[name=name]").should("be.visible").type("akun");
        cy.get("[name=password]").should("be.visible").type("123");
        cy.get("label").contains("Role").should("be.visible");
        
        cy.get("select").trigger('click');
        cy.get("option").contains("Admin");
        cy.get("option").contains("Warehouse");
        cy.get("option").contains("Cashier");

        cy.get("button").contains("Konfirmasi").click()
    })

    it("Mengedit akun", () => {
        
    })

})