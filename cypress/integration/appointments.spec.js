describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday")
  })
  xit("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });
  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[alt='Edit']")
      .click({ force: true });

    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("lol")
    cy.get("[alt='Tori Malcolm']").click();

    // Clicks the save button
    cy.contains("Save").click();

    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "lol");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});