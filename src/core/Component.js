export default class Component {
  $target;
  $props;
  $state;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props; // $props 할당
    this.setup();
    this.setEvent(); // 이벤트 버블링 등록
    this.render();
  }

  setup() {}

  mounted() {}

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted(); // render 후에 mounted가 실행 된다.
  }

  setEvent() {}
  // event를 각각의 하위 요소가 아니라 component의 target 자체에 등록하는 것이다.
  // 따라서 component가 생성되는 시점에만 이벤트 등록을 해놓으면 추가로 등록할 필요가 없어진다.

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    /* 'click', '.addBtn', ({ target }) => {
          const { items } = this.$state;
          this.setState({ items: [ ...items, `item${items.length + 1}` ] });
        }*/
    const children = [...this.$target.querySelectorAll(selector)];

    // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐
    // closest를 이용하여 처리한다.
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    // includes 포함관계 확인이 안되면 closest로 조상을 탐색한다

    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;

      callback(event);
    });
  }
}
