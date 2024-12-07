export class PointerLockManager {
  private domElement: HTMLElement;
  private onLockChange: (locked: boolean) => void;
  private cleanup: (() => void)[] = [];

  constructor(domElement: HTMLElement, onLockChange: (locked: boolean) => void) {
    this.domElement = domElement;
    this.onLockChange = onLockChange;
    this.initialize();
  }

  private initialize() {
    const handleClick = () => {
      this.domElement.requestPointerLock();
    };

    const handleLockChange = () => {
      this.onLockChange(document.pointerLockElement === this.domElement);
    };

    this.domElement.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handleLockChange);

    this.cleanup.push(() => {
      this.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handleLockChange);
    });
  }

  dispose() {
    this.cleanup.forEach(cleanup => cleanup());
  }
}