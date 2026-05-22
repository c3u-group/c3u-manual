# Slurm 作业调度

大型计算任务（如 Gaussian 大规模计算、Fluent 批量仿真）需通过 Slurm 作业调度系统提交，以保证计算资源的有序共享。

## 基本概念

- **节点（Node）**：计算节点，7、8 号机各为一个节点
- **分区（Partition）**：节点逻辑分组，决定作业优先级和运行时长上限
- **作业（Job）**：一次计算任务，包含资源申请和待执行命令

## 常用命令

```bash
sbatch job.sh         # 提交批处理作业
squeue                # 查看作业队列
squeue -u $USER       # 查看自己的作业
scancel <job_id>      # 取消指定作业
sinfo                 # 查看节点和分区状态
scontrol show job <id> # 查看作业详细信息
```

## 网页端提交任务

选择模板，分别填入任务名称，核心数，工作文件夹，（可选）通知邮箱，环境变量，即可提交任务。

## 提交脚本示例

创建 Slurm 提交脚本 `job.sh`：

```bash
#!/bin/bash
#SBATCH --job-name=gaussian_test    # 作业名
#SBATCH --output=%j.out            # 标准输出文件（%j = 作业 ID）
#SBATCH --error=%j.err             # 标准错误文件
#SBATCH --nodes=1                  # 使用节点数
#SBATCH --ntasks-per-node=4        # 每节点 CPU 核心数
#SBATCH --time=02:00:00            # 最大运行时间（HH:MM:SS）

module load gaussian16
g16 < input.gjf > output.log
```

提交作业：

```bash
sbatch job.sh
```

## 排队规范

- 提交前预估资源需求（核心数、运行时间），避免申请过多资源导致排队积压
- 使用 `squeue` 查看队列状况，如遇高峰时段适当调整提交时间
- 不再需要的作业及时 `scancel`，释放资源给其他用户
