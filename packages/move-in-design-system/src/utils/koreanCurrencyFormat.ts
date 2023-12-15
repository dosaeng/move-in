enum KoreanCurrencyFormatType {
  /// ['', '만', '억', '조', '경', '해', '자', '양']
  baseSuffix,

  /// ['', '십', '백', '천']
  subSuffix,
  full,
}

const _baseSuffix = ['', '만', '억', '조', '경', '해', '자', '양'];
const _subSuffix = ['', '십', '백', '천'];
const _digitToKorean: { [key: string]: string } = {
  '1': '일',
  '2': '이',
  '3': '삼',
  '4': '사',
  '5': '오',
  '6': '육',
  '7': '칠',
  '8': '팔',
  '9': '구',
};

const currencyFormatter = new Intl.NumberFormat();

export const format = (
  value: number,
  {
    type = KoreanCurrencyFormatType.baseSuffix,
    emptyText = "",
  }: {
    type?: KoreanCurrencyFormatType;
    emptyText?: string;
  } = {}
): string => {
  const numberText = Math.floor(value).toString();

  const numberTextLength = numberText.length;
  let result = "";
  let storedText = "";

  for (let index = 0; index < numberTextLength; index++) {
    const characterIndex = numberTextLength - index - 1;
    const character = numberText[index];
    const baseSuffixIndex = Math.floor(characterIndex / 4);
    const subSuffixIndex = characterIndex % 4;

    if (type === KoreanCurrencyFormatType.baseSuffix) {
      storedText = `${storedText}${character}`;

      if (subSuffixIndex === 0) {
        const storedNumber = parseInt(storedText) || 0;

        if (storedNumber > 0) {
          result = `${result} ${currencyFormatter.format(
            storedNumber
          )}${_baseSuffix[baseSuffixIndex]}`;
          storedText = "";
        }
      }
    } else if (type === KoreanCurrencyFormatType.subSuffix) {
      if (character !== '0') {
        storedText = `${storedText}${character}${_subSuffix[subSuffixIndex]}`;
      }

      if (subSuffixIndex === 0 && storedText !== "") {
        result = `${result} ${storedText}${_baseSuffix[baseSuffixIndex]}`;
        storedText = "";
      }
    } else {
      if (character !== '0') {
        storedText = `${storedText}${_digitToKorean[character]}${_subSuffix[subSuffixIndex]}`;
      }

      if (subSuffixIndex === 0 && storedText !== "") {
        result = `${result} ${storedText}${_baseSuffix[baseSuffixIndex]}`;
        storedText = "";
      }
    }
  }

  result = result.trim();

  if (result === "") {
    return emptyText;
  }

  return result;
}
