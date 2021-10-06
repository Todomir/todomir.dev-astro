<script>
  export let name;
  export let type = 'text';
  export let label;
  export let placeholder;
  export let required = false;
</script>

<div class="input-block">
  <label for={name}>
    {label}
  </label>
  <div class="input">
    <slot name="icon" class="icon"></slot>
    <input 
      required={required} 
      type={type} 
      name={name} 
      placeholder={placeholder || ''} 
    />
  </div>
</div>

<style lang="scss">
  .input-block {
    label {
      display: block;
      font-size: var(--body-fluid-size);
      margin-bottom: 1.2rem;
    }

    .input {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 24px;

      font-size: 1.8rem;

      background-color: var(--color-white);
      border: 2px solid var(--color-light);
      border-radius: 10px;

      padding: 16px;

      transition: all 0.2s ease-in-out;

      &[aria-invalid] {
        border-color: red;
      }

      &:focus-within {
        --background-color: var(--color-white);
        --outline-color: var(--color-dark);
        box-shadow: 0 0 0 2px var(--background-color), 0 0 0 5px var(--outline-color);
      }

      input {
        background: transparent;
        border: none;

        font-family: var(--font-family);
        font-size: 1.8rem;

        width: 100%;
        height: 100%;

        color: #000;

        &:focus {
          outline: none;
          box-shadow: none;
        }
      }
    }
  }
</style>