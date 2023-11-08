/**
 * @jest-environment jsdom
 */

// # 不依赖网络：使用Mock模拟网络请求的成功或失败，如用msw
// # 何时（不）该用快照：简短的可用，较大的数据，应尽量使用特征断言
// # 异步操作逻辑，用act将异步操作包裹起来
// # 在ts的环境下，如何测试参数不合法

import React from "react";
import { render, screen } from "@testing-library/react"
import { Add } from "./add"
import { userEvent } from "@testing-library/user-event"
import '@testing-library/jest-dom'

global.fetch = jest.fn(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        json: () => ([{ id: 'xxx', title: "ccc" }, { id: 'xxx1', title: "ccc1" }])
      })
    }, 200)
  })
})

test('loads and displays greeting', async () => {
  render(<Add />);

  expect(screen.queryByText("Loading")).toBeNull();

  await userEvent.click(
    screen.getByText('search')
  );

  expect(screen.getByText("Loading")).toBeInTheDocument();

  await screen.findByText("search");

  expect(screen.getByText("count: 2")).toBeInTheDocument();
})
