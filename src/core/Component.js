export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    // render을 사용할때마다 새로 이벤트를 등록한다
    // 뿐만 아니라 반복적인 요소에 대해 각각 이벤트를 등록해야 할 땐 여간 불편한게 아니다.
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
