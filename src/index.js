const $app = document.querySelector('#app');

let state = {
  items: ['item1', 'item2', 'item3', 'item4'],
};

const render = () => {
  const { items } = state;

  console.log(items);

  $app.innerHTML = `
    <ul>
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    <button id="append">추가</button>
  `;
  document.querySelector('#append').addEventListener('click', () => {
    setState({ items: [...items, `item${items.length + 1}`] });
  }); // state는 setState로만 변경할 수 있다.
};

const setState = (newState) => {
  // state가 변경되면 render를 실행한다.
  state = { ...state, ...newState };
  render();
};

render();
//이러한 규칙을 지켜가면서 코드를 작성한다면, 브라우저 출력되는 내용은 무조건 state에 종속되는 것이다. 즉, DOM을 직접적으로 다룰 필요가 없어진다.
