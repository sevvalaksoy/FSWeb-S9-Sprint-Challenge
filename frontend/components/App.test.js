// Write your tests here
import { beforeEach, expect, test } from 'vitest';
import React from 'react'

import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByText,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFunctional from './AppFunctional';

beforeEach(() => {
  render(<AppFunctional />);
});

test('sanity', () => {
  expect(true).toBe(false)
})

test('Email input değişimi', () => {
  async () => {
    const email = screen.getByTestId('email');
    fireEvent.change(email, { target: { value: 'svv.com' } });
    expect(email).toHaveTextContent("svv.com'");
}});

test('Koordinatlar', () => {
  async () => {
    const up = screen.getByTestId('up');
    fireEvent.click(up);
    const coordinates = screen.getByTestId("coordinates");
    expect(coordinates).toHaveTextContent("Koordinatlar (2,1)");
}});

test('sağa gidemezsin', () => {
  async () => {
    const right = screen.getByTestId('right');
    fireEvent.doubleClick(right);
    const message = screen.getByTestId("message");
    expect(message).toHaveTextContent("Sağa gidemezsiniz");
}});

test('kere hareket ettin', () => {
  async () => {
    const right = screen.getByTestId('right');
    fireEvent.doubleClick(right);
    const up = screen.getByTestId('up');
    fireEvent.click(up);
    const steps = screen.getByTestId("steps");
    expect(steps).toHaveTextContent("2 kere ilerlediniz");
}});