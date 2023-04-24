import React from 'react';
import { render } from '@testing-library/react';
import RequestHandler from './request-handler';

test('renders empty response message', () => {
  const { getByText } =render(
    <RequestHandler
      error={undefined}
      isEmptyResponse={true}
      emptyResponseMsg={'No items found for your request'}
    >
     <div>Children nodes</div>
    </RequestHandler>
  );

  expect(getByText('No items found for your request')).toBeInTheDocument();
});


test('renders children when no error and no empty response', () => {
  const childTextContent = 'Children nodes';
  const { getByTestId } =render(
    <RequestHandler
      error={undefined}
      isEmptyResponse={false}
      emptyResponseMsg={'No items found for your request'}
    >
     <div data-testid="childText">{childTextContent}</div>
    </RequestHandler>
  );

  expect(getByTestId('childText').textContent).toEqual(childTextContent);
});
