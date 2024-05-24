function validEmail(email) {
  if (!email) {
    return false;
  }

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validPhone(phone) {
  if (!phone) {
    return false;
  }

  if (typeof phone !== "string") {
    return false;
  }

  if (phone.length < 6) {
    return false;
  }

  let p = parseInt(phone);

  if (p) {
    return true;
  }

  return false;
}

function validPassword() {}

module.exports = { validEmail, validPhone };
