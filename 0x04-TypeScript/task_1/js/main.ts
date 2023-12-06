interface Teacher {
    readonly firstName: string;
    readonly lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience?: number;
    location: string;
    [key: string]: any; // Allow any additional attributes
  }

  interface Directors extends Teacher {
    numberOfReports: number;
  }

  interface printTeacherFunction {
    (firstName: string, lastName: string): string;
  }
  
  const printTeacher: printTeacherFunction = (firstName, lastName) => {
    const firstLetter = firstName.charAt(0).toUpperCase();
    const fullLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  
    return `${firstLetter}. ${fullLastName}`;
  };

  export { printTeacher};