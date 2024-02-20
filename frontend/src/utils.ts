/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export function deepEqual(obj1: unknown, obj2: unknown) {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || typeof obj1 != "object" || obj2 == null || typeof obj2 != "object") {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function formatAge(age: number): string {
  if (age % 10 === 1 && age % 100 !== 11) {
    return `${age} год`;
  } else if ((age % 10 === 2 || age % 10 === 3 || age % 10 === 4) && (age % 100 < 10 || age % 100 >= 20)) {
    return `${age} года`;
  } else {
    return `${age} лет`;
  }
}

export function getAge(arg0: Date): React.ReactNode {
  const today = new Date()
  const birthDate = new Date(arg0)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return formatAge(age)
}

function validateAge(dateString: string, minAge: number): boolean {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= minAge;
}

export function createFormData(
  file: File,
  name: string,
  type: string,
  required: string,
  step_index: string,
  tags: string[]
) {
  if (!file) return null
  const formData = new FormData()
  formData.append("file", file)
  formData.append("name", name)
  formData.append("type", type)
  formData.append("required", required)
  formData.append("step_index", step_index)
  formData.append("tags", JSON.stringify(tags))
  return formData
}