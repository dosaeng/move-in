import { ProductAddress } from '@/features/product/product';
import { getProductAddressIdPartsForLevel } from '@/features/product/utils/productAddressUtils';

function useGroupProductAddressList({ items }: { items: ProductAddress[] }) {
  return items

    .sort((a, b) => {
      return a.level - b.level;
    })
    .reduce(
      (result, item) => {
        const findIndex = result.findIndex(
          (group) =>
            getProductAddressIdPartsForLevel(group.value.id, 1) ===
            getProductAddressIdPartsForLevel(item.id, 1)
        );

        if (findIndex === -1) {
          if (item.level === 2) {
            result.push({
              value: {
                id: getProductAddressIdPartsForLevel(item.id, 1).padEnd(
                  10,
                  '0'
                ),
                level: 1,
                levelOneName: item.levelOneName,
                count: 0,
              },
              children: [item],
            });
          } else {
            result.push({
              value: item,
              children: [],
            });
          }
        } else {
          if (item.level === 2) {
            result[findIndex].children.push(item);
          } else {
            result[findIndex].value = item;
          }
        }

        return result;
      },
      [] as {
        value: ProductAddress;
        children: ProductAddress[];
      }[]
    )
    .sort((a, b) => {
      return a.value.id.localeCompare(b.value.id);
    });
}

export default useGroupProductAddressList;
