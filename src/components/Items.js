import Component from '../core/Component.js';

export default class Items extends Component {
  setup() {
    this.$state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.$state;
    return /*html*/ `
      <ul>
        ${items
          .map(
            (item, key) => /*html*/ `
            <li>
                ${item}
                <button class="deleteBtn" data-index="${key}">삭제</button>
            </li>
        `
          )
          .join('')}
      </ul>
      <button class="addBtn">추가</button>
    `;
  }

  setEvent() {
    this.$target.querySelector('.addBtn').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
      //setState를 하면 Component에서 state를 변경하고 render한다
    });

    this.$target.querySelectorAll('.deleteBtn').forEach((deleteBtn) =>
      deleteBtn.addEventListener('click', ({ target }) => {
        const items = [...this.$state.items];
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      })
    );
  }
}
