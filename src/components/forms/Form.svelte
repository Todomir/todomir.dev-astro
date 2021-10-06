<script>
  export let onSubmit;

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    onSubmit(data);
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <slot></slot>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
</style>