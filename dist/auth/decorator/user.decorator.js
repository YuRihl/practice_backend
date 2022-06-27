"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.UserDecorator = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a;
    const request = ctx.switchToHttp().getRequest();
    if (data)
        return (_a = request.user) === null || _a === void 0 ? void 0 : _a[data];
    return request.user;
});
//# sourceMappingURL=user.decorator.js.map