export function getProductAddressLevelForId(idParts: string) {
  const id = idParts.padEnd(10, '0');

  if (id.slice(6) !== '0000') {
    return 3;
  } else if (id.slice(2, 6) !== '0000') {
    return 2;
  } else {
    return 1;
  }
}

export function getProductAddressIdQuery(idParts: string) {
  const id = idParts.padEnd(10, '0');
  const level = getProductAddressLevelForId(id);

  if (level === 1) {
    return id.slice(0, 2);
  } else if (level === 2) {
    return id.slice(0, 6);
  } else {
    return id;
  }
}

export function getProductAddressIdPartsForLevel(id: string, level: number) {
  if (level === 1) {
    return id.slice(0, 2);
  } else if (level === 2) {
    return id.slice(0, 6);
  } else {
    return id;
  }
}
