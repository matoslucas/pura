export function formattMoney(value=0, options={}, locale="en-US") {

    var defaultOpts = { style: 'currency', currency: 'USD', minimumFractionDigits: 2 };
    var opts = { ...defaultOpts, ...options };

    var f = new Intl.NumberFormat(locale ? locale : navigator.language, opts);

    return f.format(value);
}

export function formattDate(value= new Date(),  options={}, locale="en-US") {

    var defaultOpts = { year: 'numeric', month: 'short', day: 'numeric' };
    var opts = { ...defaultOpts, ...options };

    var f = new Intl.DateTimeFormat(locale ? locale : navigator.language, opts);

    return f.format(value);
}
