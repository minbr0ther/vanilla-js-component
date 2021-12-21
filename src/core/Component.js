export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent(); // 이벤트 버블링 등록
    this.render();
  }
  setup() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  setEvent() {}
  // event를 각각의 하위 요소가 아니라 component의 target 자체에 등록하는 것이다.
  // 따라서 component가 생성되는 시점에만 이벤트 등록을 해놓으면 추가로 등록할 필요가 없어진다.

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
