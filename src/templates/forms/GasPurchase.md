<div class="no-print">
<button class="print-btn" onclick="window.print()">🖨️ 打印表格</button>
</div>
<div class="a4-form">
  <h3>实验用气体采购申请单</h3>

  <div class="table-wrapper">
  <table class="check-table" id="info-table">
    <tr>
      <td class="label" width=22%>姓名</td>
      <td width=28%><textarea class="fill-input" rows="1"></textarea></td>
      <td class="label" width=22%>学号</td>
      <td width=28%><textarea class="fill-input" rows="1"></textarea></td>
    </tr>
    <tr>
      <td class="label">联系电话</td>
      <td><textarea class="fill-input" rows="1"></textarea></td>
      <td class="label">指导教师</td>
      <td><textarea class="fill-input" rows="1"></textarea></td>
    </tr>
    <tr>
      <td class="label">购买用途<br/>情况说明</td>
      <td colspan="3">
        <input type="radio" name="purpose">学位论文&ensp;
        <input type="radio" name="purpose">横项项目&ensp;
        <input type="radio" name="purpose">科创比赛&ensp;
        <br/>
        <input type="radio" name="purpose">其他： <input type="text" style="border:none; border-bottom:1px solid #333;">
      </td>
    </tr>
  </table>

  <table class="check-table" id="apply-table" data-mat-extra="1">
    <tr>
      <td class="label" rowspan="2" data-mat-label width=22%>
          购买实验<br/>材料明细
          <br class="no-print"/><br class="no-print"/>
          <button class="row-btn no-print" onclick="addRow(this)">+</button>
          <button class="row-btn no-print" onclick="delRow(this)">-</button>
      </td>
      <td class="label" style="padding:0;" width=19%>气体名称</td>
      <td class="label" style="padding:0;" width=7%>纯度</td>
      <td class="label" style="padding:0;" width=12%>容积</td>
      <td class="label" style="padding:0;" width=13%>数量</td>
      <td class="label" style="padding:0;">公司</td>
      <td class="label" style="padding:0;" width=14%>存放位置</td>
    </tr>
    <tr class="material-row">
      <td><textarea rows="1" class="fill-input-cell"></textarea></td>
      <td><textarea rows="1" class="fill-input-cell"></textarea></td>
      <td><textarea rows="1" class="fill-input-cell"></textarea></td>
      <td><textarea rows="1" class="fill-input-cell"></textarea></td>
      <td><textarea rows="1" class="fill-input-cell"></textarea></td>
      <td><textarea rows="1" class="fill-input-cell"></textarea></td>
    </tr>
    <tr class="material-actions no-print"></tr>
    <tr>
      <td class="label">申请人签字</td>
      <td colspan="6"></td>
    </tr>
    <tr>
      <td class="label">指导老师意见</td>
      <td colspan="6"></td>
    </tr>
    <tr>
      <td class="label">拟报销经费<br/>(财务老师填写)</td>
      <td colspan="6"><span class="no-print">(如需填写)</span></td>
    </tr>
    <tr>
      <td class="label">经费负责人意见</td>
      <td colspan="6"><span class="no-print">(如需填写)</span></td>
    </tr>
    <tr>
      <td class="label">团队负责人意见<br/>(单批次≥3000元)</td>
      <td colspan="6"><span class="no-print">(如需填写)</span></td>
    </tr>
  </table>
  </div>

  <div class="note">
    注：1. 每周五（遇法定节假日，顺延至假期结束后第 1个工作日）9：00前填写《实验用气体采购申请单》<br>
    &emsp;&emsp;2. 此表纸质版由科研助理存档，同时申请人需向科研助理提供电子版。
  </div>
</div>
