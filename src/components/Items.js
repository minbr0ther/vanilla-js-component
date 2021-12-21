import Component from '../core/Component.js';

export default class Items extends Component {
  // 현재 까지의 코드에서는 컴포넌트를 분리할 이유가 없는 상태이다.
  // 그래서 Items 컴포넌트에 toggle, filter 등의 기능을 추가 했을 때 먼저 어떤 문제점이 있는지 알아야한다.
  get filteredItems() {
    const { isFilter, items } = this.$state;

    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
    );
  }

  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        { seq: 1, conteㅎnts: 'item1', active: false },
        { seq: 2, contents: 'item2', active: true },
      ],
    };
  }

  template() {
    return /*html*/ `
      <header>
        <input type="text" class="appender" placeholder="아이템 내용 입력" />
      </header>
      <main>
        <ul>
          ${this.filteredItems
            .map(
              ({ contents, active, seq }) => /*html*/ `
            <li data-seq="${seq}">
                ${contents}
                <button class="toggleBtn" style="color: ${
                  active ? '#09F' : '#F09'
                }">
                    ${active ? '활성' : '비활성'}
                </button>
                <button class="deleteBtn">삭제</button>
            </li>
          `
            )
            .join('')}
        </ul>
      </main>
      <footer>
        <button class="filterBtn" data-is-filter="0">전체 보기</button>
        <button class="filterBtn" data-is-filter="1">활성 보기</button>
        <button class="filterBtn" data-is-filter="2">비활성 보기</button>
      </footer>
    `;
  }

  setEvent() {
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      const { items } = this.$state;

      const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
      const contents = target.value;
      const active = false;

      this.setState({ items: [...items, { seq, contents, active }] });
    });

    this.addEvent('click', '.deleteBtn', ({ target }) => {
      if (!window.confirm('정말 삭제하시겠습니까?')) return;

      const items = [...this.$state.items];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      items.splice(
        items.findIndex((v) => v.seq === seq),
        1
      );

      this.setState({ items });
    });

    this.addEvent('click', '.toggleBtn', ({ target }) => {
      const items = [...this.$state.items];
      const index = Number(target.closest('[data-seq]').dataset.seq) - 1;

      items[index].active = !items[index].active; //본인의 값의 반대를 할당한다

      this.setState({ items });
    });

    this.addEvent('click', '.filterBtn', ({ target }) => {
      this.setState({ isFilter: Number(target.dataset.isFilter) });
    });
  }
}
