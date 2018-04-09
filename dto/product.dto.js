class ProductDTO {
  constructor() { }

  set Id(value) {
    this.id = value;
  }

  get Id() {
    return id;
  }

  set Name(value) {
    this.name = value;
  }

  get Name() {
    return this.name;
  }

  set OriginalPrice(value) {
    this.original_price = value;
  }

  get OriginalPrice() {
    return this.original_price;
  }

  set SaleProice(value) {
    this.sale_price = value;
  }

  get SaleProice() {
    return this.sale_price;
  }

  set Description(value) {
    this.description = value;
  }

  get Description() {
    return this.description;
  }

  set Images(value) {
    this.images = value;
  }

  get Images() {
    return this.images;
  }

  set Tags(value) {
    this.tags = value;
  }

  get Tags() {
    return tags;
  }

  set Promotions(value) {
    this.promotions = value;
  }

  get Promotions() {
    return this.promotions;
  }

  set CreateAt(value) {
    this.created_at = value;
  }

  get CreateAt() {
    return this.created_at;
  }

  set UpdatedAt(value) {
    this.updated_at = value;
  }

  get UpdatedAt() {
    return this.updated_at;
  }

  setProductResponse(product, images, tags, promotions) {
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.original_price = obj.original_price;
    this.sale_price = obj.sale_price;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;

    this.images = images;
    this.tags = tags;
    this.promotions = promotions;
  }
}

module.exports = ProductDTO;
