import { defineMock } from "@/common/utils/defineMock";
import { httpClient } from "@/common/utils/httpClient";
import { ProductSuggestionRatingModel } from "@move-in/design-system";
import { UseMutationOptions, useMutation } from "react-query";

interface ProductSuggestionRequestDTO {
  filter_card_id?: number;
  item_id?: number;
  recommendation_reason?: string;
  item_diagnosis_summary?: string;
  item_notes?: string;
  filter1_score?: string;
  filter1_comment?: string;
  filter1_qualified_issue?: string[];
  filter2_score?: string;
  filter2_comment?: string;
  filter2_qualified_issue?: string[];
  filter3_score?: string;
  filter3_comment?: string;
  filter3_qualified_issue?: string[];
  filter4_score?: string;
  filter4_comment?: string;
  filter4_qualified_issue?: string[];
  filter5_score?: string;
  filter5_comment?: string;
  filter5_qualified_issue?: string[];
}

export interface ProductSuggestionRequestModel {
  filterId?: number;
  productId?: number;
  productSuggestion?: {
    // 가족 조건
    familyPreference?: ProductSuggestionRatingModel;
    // 입주 조건
    moveInPreference?: ProductSuggestionRatingModel;
    // 주거 비용 예산
    costPreference?: ProductSuggestionRatingModel;
    // 원하는 집의 조건
    productPreference?: ProductSuggestionRatingModel;
    // 라이프 스타일
    lifestylePreference?: {
      score?: number;
      comment?: string;
      traffic?: { key: number, value: string }[];
      livingOption?: { key: number, value: string }[];
      communityLife?: { key: number, value: string }[];
      livingInfra?: { key: number, value: string }[];
      educationLife?: { key: number, value: string }[];
      deliveryLife?: { key: number, value: string }[];
    };
  };
}


const requestProductSuggestionEndpoint = (filterId: string | number) => `/agent-api/filter-card/${filterId}/recommendation`

const useRequestProductSuggestion = (options?: Omit<UseMutationOptions<void, unknown, ProductSuggestionRequestModel, unknown>, "mutationFn">) => {
  return useMutation(async (data: ProductSuggestionRequestModel) => {
    await httpClient.post<ProductSuggestionRequestDTO>(requestProductSuggestionEndpoint(data.filterId!), {
      body: {
        filter_card_id: data.filterId,
        item_id: data.productId,
        recommendation_reason: "",
        item_diagnosis_summary: "",
        item_notes: "",
        filter1_score: `${data.productSuggestion?.familyPreference?.score}`,
        filter1_comment: data.productSuggestion?.familyPreference?.comment,
        filter1_qualified_issue: data.productSuggestion?.familyPreference?.selected?.map((item) => item.value),
        filter2_score: `${data.productSuggestion?.moveInPreference?.score}`,
        filter2_comment: data.productSuggestion?.moveInPreference?.comment,
        filter2_qualified_issue: data.productSuggestion?.moveInPreference?.selected?.map((item) => item.value),
        filter3_score: `${data.productSuggestion?.costPreference?.score}`,
        filter3_comment: data.productSuggestion?.costPreference?.comment,
        filter3_qualified_issue: data.productSuggestion?.costPreference?.selected?.map((item) => item.value),
        filter4_score: `${data.productSuggestion?.productPreference?.score}`,
        filter4_comment: data.productSuggestion?.productPreference?.comment,
        filter4_qualified_issue: data.productSuggestion?.productPreference?.selected?.map((item) => item.value),
        filter5_score: `${data.productSuggestion?.lifestylePreference?.score}`,
        filter5_comment: data.productSuggestion?.lifestylePreference?.comment,
        filter5_qualified_issue: [
          data.productSuggestion?.lifestylePreference?.traffic?.map((item) => item.value),
          data.productSuggestion?.lifestylePreference?.livingOption?.map((item) => item.value),
          data.productSuggestion?.lifestylePreference?.communityLife?.map((item) => item.value),
          data.productSuggestion?.lifestylePreference?.livingInfra?.map((item) => item.value),
          data.productSuggestion?.lifestylePreference?.educationLife?.map((item) => item.value),
          data.productSuggestion?.lifestylePreference?.deliveryLife?.map((item) => item.value)
        ].filter((item) => item != null).flat() as string[],
      }
    });
  }, options)
}

export default useRequestProductSuggestion;

defineMock((mock) => {
  mock.post(new RegExp(`^${requestProductSuggestionEndpoint('[0-9]+')}$`), async (request) => {
    console.debug('Mocked suggestion request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    });
  });
})
