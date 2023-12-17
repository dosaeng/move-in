import { css } from '@move-in/styled-system/css';
import { token } from '@move-in/styled-system/tokens';
import React from 'react';

interface ViewBox {
  width: number;
  height: number;
}

interface PointPadding {
  start: number;
  step: number;
}

interface Props {
  className?: string;
  ratings: {
    familyPreference?: number;
    costPreference?: number;
    lifestylePreference?: number;
    productPreference?: number;
    moveInPreference?: number;
  };
}

export const ProductSuggestionRatingGraph = ({ className, ratings }: Props) => {
  const viewBox = { width: 360, height: 345 };
  const pointPadding = { start: 40, step: 30 };
  const pointAngles = [90, 20, -55, -125, 160];
  const labels = ['함께 하는 가족', '주거 비용', '라이프 스타일', '집 구성', '입주시기'];

  return (
    <svg
      className={className}
      version="1.1"
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Tick viewBox={viewBox} pointPadding={pointPadding} pointAngles={pointAngles} />
      <Axis viewBox={viewBox} pointPadding={pointPadding} pointAngles={pointAngles} />
      <Line
        viewBox={viewBox}
        pointPadding={pointPadding}
        pointAngles={pointAngles}
        values={[
          ratings.familyPreference ?? 0,
          ratings.costPreference ?? 0,
          ratings.lifestylePreference ?? 0,
          ratings.productPreference ?? 0,
          ratings.moveInPreference ?? 0,
        ]}
      />
      {pointAngles.map((pointAngle, index) => {
        const point = getPoint(pointAngle, { viewBox, padding: pointPadding.start - 10 });
        let textAnchor: string = 'middle';
        let transform = '';

        if (point[0] < viewBox.width / 2) {
          textAnchor = 'end';
        } else if (point[0] > viewBox.width / 2) {
          textAnchor = 'start';
        }

        if (index == 1) {
          transform = `translate(-30, -30)`;
        } else if (index == 2) {
          transform = `translate(-10, 10)`;
        } else if (index == 3) {
          transform = `translate(10, 10)`;
        } else if (index == 4) {
          transform = `translate(30, -30)`;
        }

        return (
          <g transform={transform}>
            <text
              x={point[0]}
              y={point[1]}
              className={css({
                textStyle: 'body-12-m',
                color: 'text.dark.04',
              })}
              textAnchor={textAnchor}
            >
              {labels[index]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Line: React.FC<{
  viewBox: ViewBox;
  pointAngles: number[];
  pointPadding: PointPadding;
  values: number[];
}> = ({ viewBox, pointAngles, pointPadding, values }) => {
  const getPadding = (value: number) => {
    return pointPadding.start + (5 - value) * pointPadding.step;
  };

  return (
    <path
      d={[
        `M ${getPoint(pointAngles[0], { viewBox, padding: getPadding(values[0]) }).join(' ')}`,
        `L ${getPoint(pointAngles[1], { viewBox, padding: getPadding(values[1]) }).join(' ')}`,
        `L ${getPoint(pointAngles[2], { viewBox, padding: getPadding(values[2]) }).join(' ')}`,
        `L ${getPoint(pointAngles[3], { viewBox, padding: getPadding(values[3]) }).join(' ')}`,
        `L ${getPoint(pointAngles[4], { viewBox, padding: getPadding(values[4]) }).join(' ')}`,
        'Z',
      ].join(' ')}
      fill={token('colors.brand.purple.03')}
      opacity={0.2}
    />
  );
};

const Tick: React.FC<{ viewBox: ViewBox; pointAngles: number[]; pointPadding: PointPadding }> = ({
  viewBox,
  pointPadding,
  pointAngles,
}) => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          const padding = pointPadding.start + index * pointPadding.step;

          return (
            <path
              d={[
                `M ${getPoint(pointAngles[0], { viewBox, padding }).join(' ')}`,
                `L ${getPoint(pointAngles[1], { viewBox, padding }).join(' ')}`,
                `L ${getPoint(pointAngles[2], { viewBox, padding }).join(' ')}`,
                `L ${getPoint(pointAngles[3], { viewBox, padding }).join(' ')}`,
                `L ${getPoint(pointAngles[4], { viewBox, padding }).join(' ')}`,
                'Z',
              ].join(' ')}
              fill="transparent"
              stroke={token('colors.stroke.light.01')}
              strokeWidth="1.2"
            />
          );
        })}
    </>
  );
};

const Axis: React.FC<{ viewBox: ViewBox; pointAngles: number[]; pointPadding: PointPadding }> = ({
  viewBox,
  pointAngles,
  pointPadding,
}) => {
  return (
    <>
      {pointAngles.map((pointAngle) => {
        return (
          <>
            <path
              d={[
                `M ${viewBox.width / 2} ${viewBox.height / 2}`,
                `L ${getPoint(pointAngle, { viewBox, padding: pointPadding.start }).join(' ')}`,
              ].join(' ')}
              fill="transparent"
              stroke={token('colors.stroke.light.01')}
              strokeWidth="1.2"
            />
          </>
        );
      })}
    </>
  );
};

// 각 점의 좌표를 구하는 함수들을 정의
// 이를 통해 그래프를 그릴 수 있음
function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

const getXPoint = (
  degree: number,
  { viewBox = { width: 360, height: 345 }, padding = 10 }: { viewBox?: ViewBox; padding?: number } = {}
) => {
  return (
    viewBox.width / 2 -
    padding * Math.cos(degreesToRadians(degree)) +
    (viewBox.width / 2) * Math.cos(degreesToRadians(degree))
  );
};

const getYPoint = (
  degree: number,
  { viewBox = { width: 360, height: 345 }, padding = 10 }: { viewBox?: ViewBox; padding?: number } = {}
) => {
  return (
    viewBox.height / 2 -
    padding * Math.sin(degreesToRadians(degree)) +
    (viewBox.height / 2) * Math.sin(degreesToRadians(degree))
  );
};

const getPoint = (
  degree: number,
  { viewBox = { width: 360, height: 345 }, padding = 10 }: { viewBox?: ViewBox; padding?: number } = {}
) => {
  return [getXPoint(degree, { viewBox, padding }), getYPoint(-degree, { viewBox, padding })];
};
