import { IsDateNow } from "./is-date-now.validation";

describe("IsDateNow",()=>{
  it("validate DateNow",()=>{
    //Arrange
    const validDateNow = Date.now();
    //Act
    const result = IsDateNow(validDateNow);
    //Assert
    expect(result).toBe(true);
  })
  it("validate DateNow",()=>{
    //Arrange
    const validDateNow = Date.now()+Date.now();
    //Act
    const result = IsDateNow(validDateNow);
    //Assert
    expect(result).toBe(false);
  })
})